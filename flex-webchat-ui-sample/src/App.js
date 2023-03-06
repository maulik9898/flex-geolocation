import React from 'react';
import * as FlexWebChat from "@twilio/flex-webchat-ui";


class App extends React.Component {

  state = {};

  constructor(props) {
    super(props);

    const {
      configuration
    } = props;
    fetch('https://ipv4.jsonip.com', {
        mode: 'cors'
      })
      .then((resp) => resp.json())
      .then((ip) => {

        console.log(configuration)
        fetch(`https://pro.ip-api.com/json/${ip.ip}?` + new URLSearchParams({
            "key": "4OVsYnRoOcJ8D",
            "fields": "status,message,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,currency,isp,org,as,proxy,hosting,query"
          }), {
            mode: 'cors'
          })
          .then((resp) => resp.json())
          .then((data) => {
            configuration.context.ip = data
            FlexWebChat.Manager.create(configuration)
              .then(manager => this.setState({
                manager
              }))
              .catch(error => this.setState({
                error
              }));

          });

      });


  }

  render() {
    const {
      manager,
      error
    } = this.state;
    if (manager) {
      console.log(manager.store.getState())
      return ( <
        FlexWebChat.ContextProvider manager = {
          manager
        } >
        <
        FlexWebChat.RootContainer / >
        <
        /FlexWebChat.ContextProvider>
      );
    }

    if (error) {
      console.error("Failed to initialize Flex Web Chat", error);
    }

    return null;
  }
}

export default App;