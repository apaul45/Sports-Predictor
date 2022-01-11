import {gql} from 'graphql-request';

export const CREATE_USER = gql`
    mutation createUser($email: String!, $username: String!, $password: String!, $passwordVerify: String!){
        registerUser(email: $email, username: $username, password: $password, passwordVerify: $passwordVerify){
            username
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login_user($username: String!, $password: String!){
        loginUser(username: $username, password: $password){
            username
        }
    }
`;

export const CREATE_PREDICTION = gql`
    mutation create_prediction($prediction: UserPrediction!){
        createPrediction(prediction: $prediction){
            _id, 
            username,
            stats{
                ppg,
                apg,
                name,
            }
        }
    }
`;

export const UPDATE_PREDICTION = gql`
    mutation update_prediction($prediction: UserPrediction!){
        updatePrediction(prediction: $prediction){
            _id, 
            username,
            stats{
                ppg,
                rpg, 
                apg, 
                bpg, 
                spg, 
                name, 
                team
            }
        }
    }
`;

export const DELETE_PREDICTION = gql`
    mutation delete_prediction($id: String!){
        deletePrediction(id: $id){
            _id, 
            username,
            stats{
                ppg,
                rpg, 
                apg, 
                bpg, 
                spg, 
                name, 
                team
            }
        }
    }
`;

