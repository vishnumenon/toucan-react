import React, { Component } from "react";

function waitForToucan(resolve) {
  if (typeof ToucanAI !== "undefined") {
    resolve();
  }
  setTimeout(() => waitForToucan(resolve), 200);
}

function loadScript(src, alreadyLoaded) {
  return new Promise(function(resolve, reject) {
    if (alreadyLoaded) {
      waitForToucan(resolve);
    } else {
      var tag = document.createElement("script");
      tag.async = false;
      tag.src = src;
      tag.addEventListener("load", resolve);
      tag.addEventListener("error", reject);
      document.getElementsByTagName("body")[0].appendChild(tag);
    }
  });
}

class ToucanAIChat extends Component {
  constructor(props) {
    super(props);
    this.toucanInstance = null;
  }
  componentDidMount() {
    let widgetUrl =
      (this.props.resourceRoot || "https://dev.toucanai.com:91") + "/widget.js";
    loadScript(widgetUrl, this.props.alreadyLoaded).then(() => {
      let options = Object.assign({}, this.props);
      if (options.embeddedMode && !options.parent) {
        options.parent = this.container;
      }
      options.onReady = t => {
        this.toucanInstance = t;
        if (this.props.onReady) {
          this.props.onReady(t);
        }
      };
      new ToucanAI(options);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.loadConvo !== prevProps.loadConvo && this.toucanInstance) {
      this.toucanInstance.changeConversation(this.props.loadConvo);
    }
  }

  render() {
    if (this.props.embeddedMode && !this.props.parent) {
      return (
        <div
          style={{ width: "100%", height: "100%" }}
          ref={c => (this.container = c)}
        />
      );
    }
    return null;
  }
}

export default ToucanAIChat;
