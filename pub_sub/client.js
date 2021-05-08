const redis = require("redis");

class Client {
  constructor(channel_rcv){
    this.client = redis.createClient();
    this.channel = 'SIMULATOR';
    this.channel_rcv = channel_rcv;
  }

  publish(key){
    this.client.publish(this.channel, key);
  }

  quit(){
    this.client.unsubscribe();
    this.client.quit();
  }

  subscribe(cb, outs){
    this.client.on("message", function(channel, message) {
      msgCount += 1
      console.log(message);
      console.log(channel);
      outs.square.data = [5]
      cb(null, outs)
      
      if(msgCount === 1) {
        this.client.unsubscribe();
        this.client.quit();
      }
    })

    this.client.subscribe(this.channel_rcv)
  }
}

module.exports = Client