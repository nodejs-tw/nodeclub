/*jslint node: true, regexp: true, nomen: true, indent: 2, vars: true */

/*!
 * nodeclub - route.js
 * Copyright(c) 2012 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

'use strict';

var sign = require('./controllers/sign');
var site = require('./controllers/site');
var user = require('./controllers/user');
var message = require('./controllers/message');
var tag = require('./controllers/tag');
var topic = require('./controllers/topic');
var reply = require('./controllers/reply');
var rss = require('./controllers/rss');
var upload = require('./controllers/upload');
var staticContent = require('./controllers/static');
var tools = require('./controllers/tools');
var status = require('./controllers/status');
var announcement = require('./controllers/announcement');
var facebook = require('./controllers/facebook');
var job = require('./controllers/job');

module.exports = function (app) {
  // home page
  app.get('/', site.index);

  // announcement
  app.get('/announcement', announcement.index);

  // sign up, login, logout
  app.get('/signup', sign.signup);
  app.post('/signup', sign.signup);
  app.get('/signout', sign.signout);
  app.get('/signin', sign.showLogin);
  app.post('/signin', sign.login);
  app.get('/active_account', sign.active_account);

  // password
  app.get('/search_pass', sign.search_pass);
  app.post('/search_pass', sign.search_pass);
  app.get('/reset_pass', sign.reset_pass);
  app.post('/reset_pass', sign.reset_pass);

  // user
  app.get('/user/:login', user.index);
  app.get('/setting', user.setting);
  app.post('/setting', user.setting);
  app.get('/stars', user.show_stars);
  app.get('/users/top100', user.top100);
  app.get('/my/tags', user.get_collect_tags);
  app.get('/my/topics', user.get_collect_topics);
  app.get('/my/messages', message.index);
  app.get('/my/follower', user.get_followers);
  app.get('/my/following', user.get_followings);
  app.get('/user/:login/topics', user.list_topics);
  app.get('/user/:login/replies', user.list_replies);
  app.post('/user/follow', user.follow);
  app.post('/user/un_follow', user.un_follow);
  app.post('/user/set_star', user.toggle_star);
  app.post('/user/cancel_star', user.toggle_star);

  // message
  app.post('/messages/mark_read', message.mark_read);
  app.post('/messages/mark_all_read', message.mark_all_read);

  // tag
  app.get('/tags/edit', tag.edit_tags);
  app.get('/tag/:name', tag.list_topic);
  app.get('/tag/:name/edit', tag.edit);
  app.get('/tag/:name/delete', tag.delete);
  app.post('/tag/add', tag.add);
  app.post('/tag/:name/edit', tag.edit);
  app.post('/tag/collect', tag.collect);
  app.post('/tag/de_collect', tag.de_collect);

  // topic
  app.get('/topic/create', topic.create);
  app.get('/topic/:tid', topic.index);
  app.get('/t/:slug', topic.index);
  app.get('/topic/:tid/top/:is_top?', topic.top);
  app.get('/topic/:tid/edit', topic.edit);
  app.post('/topic/:tid/delete', topic.delete);
  app.post('/topic/create', topic.create);
  app.post('/topic/:tid/edit', topic.edit);
  app.post('/topic/collect', topic.collect);
  app.post('/topic/de_collect', topic.de_collect);
  
  app.get('/a/:slug', topic.slug);

  // reply
  app.post('/:topic_id/reply', reply.add);
  app.post('/:topic_id/reply2', reply.add_reply2);
  app.post('/reply/:reply_id/delete', reply.delete);

  // upload
  app.post('/upload/image', upload.uploadImage);

  // tools
  app.get('/site_tools', tools.run_site_tools);

  // static
  app.get('/about', staticContent.about);
  app.get('/faq', staticContent.faq);

  //rss
  app.get('/rss', rss.index);

  // site status
  app.get('/status', status.status);

  // facebook
  app.get('/facebook/login', facebook.login);
  app.get('/facebook/redirect', facebook.redirect);
  
  // job
  app.get('/job', job.index);
  app.get('/job/create', job.create);
  app.post('/job/create', job._create);
  app.get('/job/:id', job.single);
  app.get('/job/:id/edit', job.edit);
  app.post('/job/:id/edit', job._edit);
  app.get('/job/:id/delete', job.del);
  app.post('/job/:id/delete', job._del);
};
