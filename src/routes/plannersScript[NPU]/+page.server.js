// Fetch Application data from GIS, filtered for LC1 not null and NPU. Return only relevant fields.
export async function load({ url, page, fetch }) {
  // get the NPU from the URL
  const npu = url.pathname.slice(-1);

  // switch the query depending on the NPU (high volume NPUs are filtered)
  switch (npu) {
    case 'B' || 'E' || 'M' || 'F':
      var res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/ArcGIS/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=LC1+IS+NOT+NULL+AND+NPU%3D%27${npu}%27+AND+LC1_date+OR+LC2_date+OR+LC3_date+>+CURRENT_TIMESTAMP+-+30&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CApplicationLink%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`);
      break;
    default:
      var res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/ArcGIS/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=LC1+IS+NOT+NULL+AND+NPU%3D%27${npu}%27+AND+LC1_date+>+CURRENT_TIMESTAMP+-+30&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CApplicationLink%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`);
  }

  // const res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/ArcGIS/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=LC1+IS+NOT+NULL+AND+NPU%3D%27${npu}%27&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CApplicationLink%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`);

  // query the feature server for items with LC1_date in the past 30 days
  // const res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/ArcGIS/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=LC1_date+>+CURRENT_TIMESTAMP+-+30&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CApplicationLink%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=`);

  const data = await res.json();

  // console.log(npu);

  return {
    props: {
      data,
      page,
      npu
    },
  };
}