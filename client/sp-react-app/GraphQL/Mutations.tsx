import {gql} from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($email: String!, $username: String!, $password: String!, $passwordVerify: String!){
        registerUser(email: $email, username: $username, password: $password, passwordVerify: $passwordVerify)
    }
`;

export const LOGIN_USER = gql`
    mutation login_user($username: String!, $password: String!){
        loginUser(username: $username, password: $password)
    }
`;

export const CREATE_PREDICTION = gql`
    mutation create_prediction($prediction: UserPrediction!){
        createPrediction(prediction: $prediction)
    }
`;

export const UPDATE_PREDICTION = gql`
    mutation update_prediction($prediction: UserPrediction!){
        updatePrediction(prediction: $prediction)
    }
`;

export const DELETE_PREDICTION = gql`
    mutation delete_prediction($id: String!){
        deletePrediction(id: $id)
    }
`;

