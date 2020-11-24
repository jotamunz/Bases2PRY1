exports = async function (changeEvent) {
  const mongodb = context.services.get("Cluster0");
  const users = mongodb.db("MAIN_DB").collection("users");
  const approvalroutes = mongodb.db("MAIN_DB").collection("approvalroutes");
  
  if ((changeEvent.fullDocument).hasOwnProperty('previousVersionId')){
    const newSchemeId = changeEvent.documentKey._id;
    const oldSchemeId = changeEvent.fullDocument.previousVersionId;
    await users.updateMany(
      { "accessibleSchemes": {schemeId:oldSchemeId}}, 
      { "$set": { "accessibleSchemes.$": {schemeId:newSchemeId} } },
      { multi: true }
      );
    await approvalroutes.updateMany (
      {schemeId:  oldSchemeId},
      {$set : {schemeId: newSchemeId}},
      { multi: true });
  }
}
