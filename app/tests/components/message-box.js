// import React from 'react/addons';
// import MessageBox from 'components/message-box';
// import {expect} from 'chai';
// import {describe, it} from 'mocha';

// const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = React.addons.TestUtils;


// describe('MessageBox', () => {
//   it('invokes callback when a button is clicked', () => {
//     const component = renderIntoDocument(
//       <MessageBox />
//     );

//     let textarea = scryRenderedDOMComponentsWithTag(component, 'textarea');
//     textarea = textarea[0].getDOMNode();
//     textarea.value = 'Hello';
//     Simulate.change(textarea);

//     let input = scryRenderedDOMComponentsWithTag(component, 'input');
//     input = input[0].getDOMNode();
//     input.value = 'User';
//     Simulate.change(input);

//     const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
//     Simulate.click(buttons[0].getDOMNode());

//     expect(textarea.value).to.equal('');
//   });
// });
