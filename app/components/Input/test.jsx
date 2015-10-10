/* eslint-disable */

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import Input from 'components/Input';

describe('Input', () => {
  it('renders without problems', () => {
    const input = TestUtils.renderIntoDocument(<Input />).render();
    input.should.to.exist;
  });

  it('shourd create default class', () => {
    const input = TestUtils.renderIntoDocument(<Input />).render();
    input.props.should.have.property('className').and.equal('input');
  });

  it('shoud pass props', () => {
    const testAttrValue = `${Math.random()}`;
    const input = TestUtils.renderIntoDocument(<Input id='test' testAttr={testAttrValue} />).render();
    input.props.should.have.property('id');
    input.props.should.have.property('testAttr').and.equal(testAttrValue);
  });

  it('shoud combine classes', () => {
    const input = TestUtils.renderIntoDocument(<Input className='test' />).render();
    input.props.should.have.property('className').and.contain('input');
    input.props.should.have.property('className').and.contain('test');
  });
});
