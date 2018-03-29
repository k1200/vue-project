export const activitiesdata = res => {
  if (parseInt(res.ret) === 0) {
    console.log(res.data)
    // res.data.forEach( function(item, index) {
    //   if
    // });
    return {appset: res.appset, activities: res.data}
  }
}
