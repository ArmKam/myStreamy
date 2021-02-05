import _ from 'lodash';
// lodash is helper lib we import it 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editeStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        // console.log(this.props);
        // console.log(formValues);
        this.props.editeStream(this.props.match.params.id, formValues);
    };
    render() {

        //console.log(this.props);
        // We will see two log in the console when first time page loads up . 
        // the first log from our render metode in first log our stream is undefined 
        //  after the component is render agein when our data is fetches

        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>Edit a Streamm</h3>
                <StreamForm
                    // initialValues={title = this.props.stream.title}  solution without lodash
                    initialValues={_.pick(this.props.stream, "title", "description")}

                    //initialValue is very special property name with redux from!!!
                    // title and description is connect to our form value into our StremFrom component
                    //the first curly bracees indicates that we are going to 
                    //write some javascript expression inside JSX. The seconde set
                    //indicateing that we are createing a normal object 
                    onSubmit={this.onSubmit}
                />
            </div>
        );


    }

};


const mapStateToProps = (state, ownProps) => {
    // The first argument is always our state object 
    // The second argument is the ownProps and this is a 
    //reference to the prop's object tha shows up  inside stream edit component

    //console.log(state.streams)  when we directly coming into this link state.stream is en empmty Obj.
    //With React-Router, each  component  needs  to be designed to work in isolation (fatch is own data)
    return { stream: state.streams[ownProps.match.params.id] };
    //ownProps.match.params.id is return n id wich we want to edite 
    //and we search this id into out stream object
}
export default connect(mapStateToProps, { fetchStream, editeStream })(StreamEdit);