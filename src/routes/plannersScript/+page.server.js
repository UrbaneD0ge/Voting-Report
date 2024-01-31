export async function load({ page, fetch }) {
  const res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/arcgis/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=LC1+IS+NOT+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnHiddenFields=false&returnGeometry=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=NPU&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson`);
  const data = await res.json();

  return {
    props: {
      data,
      page,
    },
  };
}