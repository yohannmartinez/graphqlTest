import React from "react";
import { graphql } from "react-apollo";
import { getOrganisations, createOrganisation , deleteOrganisation} from "../queries/organisationQueries";
import { flowRight as compose } from "lodash";

class CreateOrganisation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      population: undefined
    };
  }

  createOrganisation(e) {
    e.preventDefault();
    this.props.createOrganisation({
      variables: {
        name: this.state.name,
        population: Number(this.state.population)
      },
      refetchQueries: [{ query: getOrganisations }]
    });
    console.log(this.state);
  }

  deleteOrganisation(organisationID){
    this.props.deleteOrganisation({
      variables: {
        id: organisationID,
      },
      refetchQueries: [{ query: getOrganisations }]
    })
  }

  render() {
    return (
      <div>
        {this.props.getOrganisations.loading ? (
          "loading organisations"
        ) : (
          <React.Fragment>
            <div>
              organisations are
              {this.props.getOrganisations.organisations.map(organisation => (
                <div key={organisation.id} onClick={()=>{this.deleteOrganisation(organisation.id)}}>{organisation.name}</div>
              ))}
            </div>
            <form onSubmit={this.createOrganisation.bind(this)}>
              <input
                placeholder="name"
                value={this.state.name}
                onChange={e => {
                  this.setState({ name: e.target.value });
                }}
              />
              <input
                placeholder="population"
                value={this.state.population || ""}
                onChange={e => {
                  this.setState({ population: e.target.value });
                }}
              />
              <button type="submit">Ajouter</button>
            </form>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default compose(
  graphql(getOrganisations, { name: "getOrganisations" }),
  graphql(createOrganisation, { name: "createOrganisation" }),
  graphql(deleteOrganisation, { name: "deleteOrganisation" }),
)(CreateOrganisation);
