// Wrapper try-catch function for executing all db queries.

export async function executeQuery(
  queryFN,
  errorMsg = "Error in executing query"
) {
  try {
    return await queryFN();
  } catch (error) {
    console.log(errorMsg, error);
    return null;
  }
}
