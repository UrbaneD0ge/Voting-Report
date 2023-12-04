export const actions = {
  docuSign: async ({ request }) => {
    // console.log('default action');

    // get the submitted agenda item
    const data = await request.formData();

    let items = data.get('items');


    console.log(items);


  }
};