// Fetch Application data from GIS, filtered for LC1 not null and NPU. Return only relevant fields.
export async function load({ url, page, fetch }) {
  // get the NPU from the URL
  const npu = url.pathname.slice(-1);

  // switch the query depending on the NPU (high volume NPUs are filtered)
  // B, E, F, M are high volume NPUs
// NPU=%27B%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27Support%27+AND+LC1+%3C%3E+%27Approved%27+OR+NPU=%27B%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27nonsupport%27+AND+LC1+%3C%3E+%27Denied%27
  switch (npu) {
    case 'B':
      console.log('High volume NPU', npu);
      var res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/ArcGIS/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=NPU=%27B%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27Support%27+AND+LC1+%3C%3E+%27Approved%27+OR+NPU=%27B%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27nonsupport%27+AND+LC1+%3C%3E+%27Denied%27&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CApplicationLink%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson`);
      break;
    case 'E':
      console.log('High volume NPU', npu);
      var res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/ArcGIS/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=NPU=%27E%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27Support%27+AND+LC1+%3C%3E+%27Approved%27+OR+NPU=%27E%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27nonsupport%27+AND+LC1+%3C%3E+%27Denied%27&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CApplicationLink%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson`);
      break;
    case 'F':
      console.log('High volume NPU', npu);
      var res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/ArcGIS/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=NPU=%27F%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27Support%27+AND+LC1+%3C%3E+%27Approved%27+OR+NPU=%27F%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27nonsupport%27+AND+LC1+%3C%3E+%27Denied%27&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CApplicationLink%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson`);
      break;
    case 'M':
      console.log('High volume NPU', npu);
      var res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/ArcGIS/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=NPU=%27M%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27Support%27+AND+LC1+%3C%3E+%27Approved%27+OR+NPU=%27M%27+AND+LC1+IS+NOT+NULL+AND+LC1_date+%3E+CURRENT_TIMESTAMP+-+30+AND+Reccomendation+%3D+%27nonsupport%27+AND+LC1+%3C%3E+%27Denied%27&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CApplicationLink%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson`);
      break;
    default:
      console.log('Low volume NPU', npu);
      var res = await fetch(`https://services5.arcgis.com/5RxyIIJ9boPdptdo/ArcGIS/rest/services/survey123_7cab6c833fc04777b357af274c0ba090_results/FeatureServer/0/query?where=LC1+IS+NOT+NULL+AND+NPU%3D%27${npu}%27+AND+LC1_date+>+CURRENT_TIMESTAMP+-+30&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=NPU%2CNameNumber%2CApptype%2CReccomendation%2CMonthChoice%2CAddress%2CApplicationLink%2CLC1%2CLC2%2CLC3%2CLC1_date%2CLC2_date%2CLC3_date&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&sqlFormat=none&f=pjson`);
  }

  const data = await res.json();

  // console.log(data);

  // console.log(npu);

  return {
    props: {
      data,
      page,
      npu
    },
  };
};