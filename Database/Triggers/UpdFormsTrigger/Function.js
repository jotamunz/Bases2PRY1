exports = async function (changeEvent) {
  const mongodb = context.services.get("Cluster0");
  const forms = mongodb.db("MAIN_DB").collection("forms");
  const approvalroutes = mongodb.db("MAIN_DB").collection("approvalroutes");
  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  
  //routes.0.approvers.0.decision:1
  let desicionUpdate = false;
  const formId = changeEvent.documentKey._id;
  const modifiedFields = Object.keys(changeEvent.updateDescription.updatedFields);
  for (const modifiedField of modifiedFields) {
    let splitFields = modifiedField.split(".");
    if (splitFields[0] == "routes" && splitFields [4] == "decision") {
      desicionUpdate = true;
      let desicionField = ""; 
      if (changeEvent.updateDescription.updatedFields [modifiedField] == 1) {
        desicionField = splitFields[1].concat(".currentApprovals");
      } else {             
        desicionField = splitFields[1].concat(".currentRejections");
      }
      let update = { $inc : {} };
      update.$inc["routes.".concat(desicionField)] = 1;
      await forms.updateOne(
        {_id:formId},
        update
      );
    }
  }
  if (desicionUpdate) {
    let form = await forms.findOne ({_id: formId });
    let routesStatus = [];
    for (const route of form.routes) {
      let approvalRoute = await approvalroutes.findOne (
        {_id: route.approvalRouteId},
        {requiredApprovals: 1, requiredRejections: 1, _id: 0}
      );
      if (route.currentApprovals >= approvalRoute.requiredApprovals){
        routesStatus.push(1);
      }
      else if(route.currentRejections >= approvalRoute.requiredRejections){
        routesStatus.push(2);
      }
      else {
        let pendingDesicions = 0;
        for (const approver of route.approvers) {
          if (approver.decision == 0) {
            pendingDesicions = pendingDesicions + 1;
          }
        }
        console.log (pendingDesicions)
        if ((approvalRoute.requiredApprovals - route.currentApprovals) <= pendingDesicions || (approvalRoute.requiredRejections - route.currentRejections) <= pendingDesicions) {
          routesStatus.push(0);
        }
        else {
          routesStatus.push(4);
        }
      }
    }
    let formStatus;
    if ((countOccurrences (routesStatus,2)) > 0 || (countOccurrences (routesStatus,4)) > 0) {
      formStatus = 2;
    }
    else if ((countOccurrences (routesStatus,0)) > 0) {
      formStatus = 0;
    }
    else {
      formStatus = 1;
    }
    if (formStatus != 0) {
      await forms.updateOne(
          {_id:formId},
          { $set: { status: formStatus}}
      );
    }
  }
}

