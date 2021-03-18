const initialState = {
    usersList:[
        {
            id:1,
            name:'Khoa Nguyen',
            email:'admin@admin.com',
            role:'ADMIN'
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