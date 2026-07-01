exports.handler = async function(event) {
  const sql = event.queryStringParameters && event.queryStringParameters.sql;
  if (!sql) {
    return { statusCode: 400, body: JSON.stringify({ error: 'חסרה שאילתת SQL' }) };
  }
  try {
    const url = `https://data.gov.il/api/3/action/datastore_search_sql?sql=${encodeURIComponent(sql)}`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};
