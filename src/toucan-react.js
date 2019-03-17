import React, { Component } from "react";

function loadScript(src) {
  return new Promise(function(resolve, reject) {
    var tag = document.createElement("script");
    tag.async = false;
    tag.src = src;
    tag.addEventListener("load", resolve);
    tag.addEventListener("error", reject);
    document.getElementsByTagName("body")[0].appendChild(tag);
  });
}

class ToucanAIChat extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.toucanInstance;
  }
  componentDidMount() {
    loadScript("https://dev.toucanai.com:91/widget.js").then(() => {
      this.toucanInstance = new ToucanAI(this.props);
    });
  }
  render() {
    return <div className="toucan-ai-chat" />;
  }
}

export default ToucanAIChat;
