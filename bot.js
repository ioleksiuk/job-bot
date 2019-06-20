const telegraf = require('telegraf');
const bot = new telegraf("719324937:AAHozQ9uRxa54Lbgj3YtHW9k4EnydwFDYJs");
var Feed = require('rss-to-json');
const fs = require('fs');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const TOKEN = process.env.TOKEN || 'abcde'

console.log(TOKEN)
const Job = mongoose.model('Job', { title: String });


function parseJobs() {
  const start = new Date()
    Feed.load('https://jobs.dou.ua/vacancies/feeds/?category=Security', function(err, rss){
      if(err) {
          return console.log(err);
      }
      for (element of rss.items) {
        console.log(element.title)
        const job = new Job({ name: element.title });
				Job.find({title: element.title})
					.then((jobs) => {
					if (!jobs) {
						job.save().then(console.log)
					} else {
				console.log('OLD JOB')
				}
				})
      }
  })
}
Job.find({ })
	.then(console.log)
	.catch(console.error)

// parseJobs()

// setInterval(parseJobs, 10 * 1000)

bot.start((ctx, next) => {
})



// bot.action('/set', (ctx) => {
//
// Feed.load('https://jobs.dou.ua/vacancies/feeds/?category=Security', function(err, rss){
//       console.log(rss);
//   });

// updateUser(ctx)
// })


bot.launch()
