exports = async function (changeEvent) {
  const mongodb = context.services.get("Cluster0");
  const users = mongodb.db("MAIN_DB").collection("users");
  const approvalroutes = mongodb.db("MAIN_DB").collection("approvalroutes");

  const deletedSchemeId = changeEvent.documentKey._id;
  await users.updateMany(
    { },
    { $pull: { accessibleSchemes: { schemeId: deletedSchemeId} } },
    { multi: true }
    );
  await approvalroutes.deleteMany (
    {schemeId:  deletedSchemeId}
    );
}
