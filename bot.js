const telegraf = require('telegraf');
const bot = new telegraf("719324937:AAHozQ9uRxa54Lbgj3YtHW9k4EnydwFDYJs");
var Feed = require('rss-to-json');
const fs = require('fs');

//how to store API KEY securely
//how to parse JSON
//how to work with RSS

bot.use((ctx, next) => {
  const start = new Date()
  return next(ctx).then(() => {
    Feed.load('https://jobs.dou.ua/vacancies/feeds/?category=Security', function(err, rss){
      // jobs = JSON.parse(rss)
      // console.log(rss)
      // console.log(rss.items)
      // console.log(rss)
      // fs.writeFile("/tmp/test", rss.stringify(), function(err) {
      if(err) {
          return console.log(err);
      }
      ctx.reply(JSON.stringify(rss.items[0].title));

    // console.log("The file was saved!");
      // var myRe = (?<=\"title\": \")(.*\n?)(?=\") ;
      // var re = new RegExp('(?<=\"title\"\: \")(.*\n?)(?=\")')
      // var myArray = myRe.exec(rss);
          // regexp = "(?<=\"title\"\: \")(.*\n?)(?=\")"
          // var myArray = regexp.exec(rss)
          // ctx.reply(rss);
      });
  })
})



// bot.action('/set', (ctx) => {
//
// Feed.load('https://jobs.dou.ua/vacancies/feeds/?category=Security', function(err, rss){
//       console.log(rss);
//   });

// updateUser(ctx)
// })


bot.launch()
