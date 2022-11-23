FROM ruby:3.1.2-bullseye

WORKDIR /server-app

COPY . .
RUN bundle install

# CMD ["rails", "server"]
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "8080"]
