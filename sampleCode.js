/* I was not quite sure what to send for a code sample, so I decided to put together some of the code that I have written.
* The repo that the code is from is above each sample
* Feel free to look at my github @ https://github.com/moogsG
*/

/* Router for express
*https://github.com/moogsG/Buzzin/blob/master/routes/index.js
* Readable and simple code
*/
'use strict';
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
/* GET home page. */

router.get('/', (req, res) => {

  if (!req.session.username) {
    req.session.username = null;
  }

  knex('maps').select()
    .then((maps) => {

      const templateVars = {
        user: req.session.username,
        userId: req.session.userid,
        maps: maps
      };

      res.render('index', templateVars);
    });
});

module.exports = router;

/* Favorite mapID
* https://github.com/moogsG/Buzzin/blob/master/public/scripts/mapsView.js
* Lets Users favorite a map and sends a post request to the server to update it
* Heavily used data attributes in this project
*/
 $(function() {
  $('#favoriteMap').on('click', function(event) {
    event.preventDefault();
    const mapID = $(this).attr('mapId');
    const user = $(this).attr('user');
    const values = {
      user_id: user,
      map_id: mapID
    }
    $.post('/users/favorite', values)
      .done(function() {
        $('#favoriteMap').removeClass('btn-primary').addClass('btn-favorite');
      })
  });
});
/* Unit Testing
* https://github.com/moogsG/jungle-rails/blob/master/spec/models/user_spec.rb
* Done in rails with RSpec
*/
require 'rails_helper'

RSpec.describe User, type: :model do

  describe "Password validation" do
    it { should validate_length_of(:password).is_at_least(6).on(:create)}
    it { should validate_presence_of(:password)}
    it { should validate_confirmation_of(:password)}
  end

  describe "Unique Email" do
    it { should validate_presence_of(:email)}
    it { should validate_uniqueness_of(:email).case_insensitive}
  end

  describe "First name && last name" do
    it { should validate_presence_of(:last_name)}
    it { should validate_presence_of(:first_name)}
  end

  describe '.authenticate_with_credentials' do

    describe do
    it "email with spaces" do

      user =  User.new(email: 'asdfasdf@asdf.com', password: 'asdfasdf', last_name: "asdf", first_name: "bob")
      user.save!
      login = User.authenticate_with_credentials(' AsDfaSdf@asdf.com ', 'asdfasdf')
      expect(login).to have_attributes(:email => 'asdfasdf@asdf.com')

    end
  end
 end
end

/* StateChange function from react project
* https://github.com/moogsG/blockheads/blob/master/src/App.jsx
Setting state in React.  Not that proud of this messy project, we have plans to switch to redux.
*/
onStateChange(newState) {
  this.setState({...newState}, () => {
    const pubKey = SHA256(this.state.privKey).toString();
    this.setState({pubKey});
  })
}
