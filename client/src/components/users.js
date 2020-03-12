import React from 'react'
import {gql} from 'apollo-boost'
import {graphql} from 'react-apollo'

const getUserQuery = gql`
    {
        users{
            id
            firstname
            organisation{
                name
                id
            }
        }
    }
`

class Users extends React.Component{
    displayUsers() {
        let data = this.props.data;
        if(data.loading){
            return(<div>Loading Users...</div>)
        } else {
            return data.users.map(user=>{
                return(<p key={user.id}>{user.firstname}, partner of {user.organisation.name} where the organisation id is {user.organisation.id}</p>)
            })
        }
    }

    render() {
        return(
            <div>
                {this.displayUsers()}
            </div>
        )
    }
}

export default graphql(getUserQuery) (Users);