const initialState = {
    usersList:[
        {
            id:1,
            name:'Khoa Nguyen'
        }
    ],
    user:{}
}


 const usersReducer =(state = initialState , action ) =>{
    switch (action.type) {

        default:
            return state;
    }
}

export default usersReducer