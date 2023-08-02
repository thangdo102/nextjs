module.exports = {
  apps : [{
    script: 'npm start'
  }],

  deploy : {
    production : {
      key  : 'key.pem',
      user : 'ubuntu',
      host : '52.77.219.91',
      ref  : 'origin/main',
      repo : 'git@github.com:thangdo102/nextjs.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
