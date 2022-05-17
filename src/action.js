export const PRODUCT_DETAIL = 'PRODUCT_DETAIL';

export const getProduct = data => ({
    type: PRODUCT_DETAIL,
    payload: data,
})

export const fetchProduct = () => {
    return (dispatch, getState) => {
        const page = getState().count + 1;
        // console.log("here",  getState().count, page)
        fetch(`https://reqres.in/api/products/${page}`)
        .then((res) => res.json())
        .then(response => { 
            // console.log("response",response);
            dispatch(getProduct(response.data));
        })
        .catch(error => {console.error("error", error)})
    }
}
