const initialState = {
    camera: {
        prevLookAt: null,
        position: null,
        lookAt: null,
    }
}

export default function charReducer(state = initialState, action) {
    console.log('charReducer',state)
    switch(action.type){
        default: 
            return state;
    }
}