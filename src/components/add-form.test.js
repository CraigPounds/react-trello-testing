import React from 'react';
import {shallow, mount} from 'enzyme';

import AddForm from './add-form';

describe('<AddForm />', () => {
    // Shallow Rendering ~ 'smoke test'
    // renders one component, child components aren't expanded and
    // their output cannot be inspected but you can inspect which
    // child components were rendered/what props are passed to them
    // shallow functions run quickly
    it('Renders without crashing', () => {
        shallow(<AddForm />);
    });

    // Shallow Rendering
    it('Renders the add button initially', () => {
        // Asserting that we see the button when the
        // AddForm component is initially rendered
        const wrapper = shallow(<AddForm />);
        expect(wrapper.hasClass('add-button')).toEqual(true);
    });

    // Shallow Rendering
    it('Should render the add form when editing', () => {
        const wrapper = shallow(<AddForm />);
        // Calling .instance returns the instance of the React component
        // Here we use instance to call the setEditing method (which updates the state of the component)
        wrapper.instance().setEditing(true);
        // When we call a method which updates the state
        // Enzyme won't automatically rerender the component
        wrapper.update();
        // Here we assert the root element should change from
        // <div> with class add-button to <form> with class add-form
        expect(wrapper.hasClass('add-form')).toEqual(true);
    });

    // Shallow Rendering
    it('Should switch to editing when the add button is clicked', () => {
        const wrapper = shallow(<AddForm />);
        // Simulate DOM events using .simulate method to ensure that
        // component responds correctly to user interactions
        wrapper.simulate('click');
        // Enzyme automatically checks for updates after simulating
        // an event, so we don't need to call .update() here
        expect(wrapper.state('editing')).toEqual(true);
    });

    // Full DOM Rendering
    it('Should fire the onAdd callback when the form is submitted', () => {
        // Make a spy - small function that keeps record each
        // time it is called (for testing callback functions)
        const callback = jest.fn();
        // We use mount() to render the component,
        // passing in the spy as the onAdd prop
        const wrapper = mount(<AddForm onAdd={callback} />);
        const value = 'Foobar';
        // setEditing method is called updateing state of component
        wrapper.instance().setEditing(true);
        // Enzyme won't automatically rerender the component
        wrapper.update();
        // find the text input and set it's value
        // (with full DOM rendering we directly access the DOM node
        // using the .instance() method then manipulate it using .value
        // as if we had an actual DOM node within a browser environment)
        wrapper.find('input[type="text"]').instance().value = value;
        wrapper.simulate('submit');
        expect(callback).toHaveBeenCalledWith(value);
    });

    // Full DOM Rendering
    it('Should not fire onAdd if the input is empty', () => {
        const callback = jest.fn();
        const wrapper = mount(<AddForm onAdd={callback} />);
        wrapper.instance().setEditing(true);
        // simulate a submit event and check whether the spy has been
        // called depending on whether the text input was filled in
        wrapper.simulate('submit');
        expect(callback).not.toHaveBeenCalled();
    });
});
