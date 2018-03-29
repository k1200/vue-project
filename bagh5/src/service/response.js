export const activitiesdata = res => {
  if (parseInt(res.ret) === 0) {
    console.log(res.data)
    res.data.forEach(function (item, index) {
      item.page_progress = parseInt(item.get_sum) / (parseInt(item.re_sum) + parseInt(item.get_sum)) * 100
      item.page_class = item.page_progress === 100 ? 'progress' : 'progress_full'
    })
    return {appset: res.appset, activities: res.data}
  }
}
