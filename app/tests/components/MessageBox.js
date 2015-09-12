import React from '../../../node_modules/react/addons';
import MessageBox from '../../components/messageBox/index.jsx';
import {expect} from 'chai';
import {describe, it} from 'mocha';

const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;

console.log('ms', MessageBox)

describe('MessageBox', () => {

    // ...

    it('invokes callback when a button is clicked', () => {

        const component = renderIntoDocument(
            <MessageBox />
        );


        let textarea = scryRenderedDOMComponentsWithTag(component, 'textarea');
        textarea = textarea[0].getDOMNode();
        textarea.value = "Hhelo";
        Simulate.change(textarea);

        let input = scryRenderedDOMComponentsWithTag(component, 'input');
        input = input[0].getDOMNode();
        input.value = "User";
        Simulate.change(input);

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0].getDOMNode());

        expect(textarea.value).to.equal('');
    });

});