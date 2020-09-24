import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe('render()', () => {
    it('renders the Box', () => {
      expect(wrapper.find({ 'data-testid': 'app-box' })).toHaveLength(1);
    });
    it('renders the action container', () => {
      expect(wrapper.find('.user-actions')).toHaveLength(1);
    });
    it('renders the button', () => {
      expect(wrapper.find('.user-actions').find('.users-loadmore-button')).toHaveLength(1);
    });
    it('button has correct text', () => {
      expect(wrapper.find('.user-actions').find('.users-loadmore-button').text()).toEqual('Load more');
    });
  });

  describe('actions()', () => {
    it('sets the loading state', () => {
      const button = wrapper.find('.user-actions').find('.users-loadmore-button');
      button.simulate('click');
      expect(wrapper.find('.user-actions').find('.loader')).toHaveLength(1);
    });
  });

});
