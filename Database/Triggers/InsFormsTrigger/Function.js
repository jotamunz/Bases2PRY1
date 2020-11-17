exports = async function (changeEvent) {
  const mongodb = context.services.get("Cluster0");
  const users = mongodb.db("MAIN_DB").collection("users");
  const approvalroutes = mongodb.db("MAIN_DB").collection("approvalroutes");
  const forms = mongodb.db("MAIN_DB").collection("forms");

  const insertedForm = changeEvent.fullDocument;
  const formCreatorId = insertedForm.userId;
  const formSchemeId = insertedForm.schemeId;
  const validApprovalRoutes = await approvalroutes.find(
    { schemeId: formSchemeId, authors: { $elemMatch: { userId: formCreatorId } } } 
    ).toArray();
  if (validApprovalRoutes.length > 0) {
    let routes = [];
    for (const validApprovalRoute of validApprovalRoutes) {
      let newApprovers = [];
      for (const approver of validApprovalRoute.approvers) {
        let newApprover = {
          userId: approver.userId,
          decision: 0,
          approvalDate: null 
        };
        newApprovers.push (newApprover);
      }
      let newRoute = {
        approvalRouteId: validApprovalRoute._id,
        approvers: newApprovers,
        currentApprovals: 0,
        currentRejections: 0
      };
      routes.push (newRoute);
   }
   forms.updateOne (
      {_id:insertedForm._id},
      { $push: { routes: {$each: routes}}}
    );
  }
  else {
    await forms.updateOne(
      {_id: insertedForm._id},
      {$set: {status: 1}}
    );
  }
}
