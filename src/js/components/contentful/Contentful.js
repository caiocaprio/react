
import { createClient } from 'contentful'
import * as config from './../../config/contentful.config'
import React from 'react';

export default class Contentful extends React.Component {
    constructor(props) {
        super(props)
        this.state = { planos: [] }
    }

    

    componentDidMount() {
        const client = createClient({
            // This is the space ID. A space is like a project folder in Contentful terms
            space: config.SPACE_ID,
            environment: config.ENVIRONMENT_ID,
            // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
            accessToken: config.ACCESS_TOKEN_DELIVERY,
            // host: 'preview.contentful.com'
        })

        client.getEntries({
            content_type: 'planos',
            select: 'sys.id,' +
                'fields.namePlan,' +
                'fields.descriptionPlan,' +
                'fields.franchisePlan,' +
                'fields.bonusPlan,' +
                'fields.priceOldPlan,' +
                'fields.photoPlan,' +
                'fields.BenefitsRelationship'
        })
        .then((response) => {
            this.setState({planos:response.items})
            console.log(response.items)
        })
        .catch((err) => console.log(err))

    }

    render() {
        const ulStyle = {
            marginTop:'20px'
        }

        const planos = this.state.planos.map((plano, index)=> {

            const nomePlno = plano.fields.namePlan;

           
            
            const liStyle = {
                textAlign:'left',
                marginBottom:'20px'
            }

            return (
                <li style={liStyle} key={index}>
                    <ul>
                        <li>Plano: {plano.fields.namePlan}</li>
                        <li>Franquia: {plano.fields.franchisePlan}</li>
                        <li>Descrição: {plano.fields.descriptionPlan}</li>
                        <li>Bonus: {plano.fields.bonusPlan}</li>
                        {/* <li>foto:<img src={plano.fields.photoPlan.fields.file.url}/></li> */}
                    </ul>
                </li>
            )

            // return <div key={index}>{JSON.stringify(plano)}</div>
        })

        return (
            
            <ul style={ulStyle}>
                {planos}
            </ul>
        )




    }
}

