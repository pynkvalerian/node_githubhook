function pull {
  cd ~/Desktop/thumbsup
  git checkout master
  git pull origin master
  rails s
}

pull ;
