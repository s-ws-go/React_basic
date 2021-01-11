import "./App.css";
import { Component } from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

// class안에선 function 생략
// 3열) .js 확장자 안 씀.

// component 생성!
//App이라는 컴포넌트에 Subject라는 하위 컴포넌트가 있는거임
class App extends Component {
  constructor(props) {
    //props를 초기화 하는 함수
    super(props);
    this.max_content_id = 3; //  UI와 무관한 부분이니 state로 삽입할 필요 없음
    this.state = {
      //state값을 초기화하여 Subject라는 객체를 state안에 삽입
      mode: "welcome",
      swelcomed_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "반가워 메인이야" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is Hypertext..." },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      var _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      ); // 호출
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            // add content to this.state.contents.
            this.max_content_id = this.max_content_id + 1;
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            });
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({
              contents: _contents,
              mode: "read",
            });
            console.log(_title, _desc);
          }.bind(this)}
        ></UpdateContent>
      );
    }
    return _article;
  }

  render() {
    console.log("App render");
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub} // 상위 컴포넌트의 스테이트 값을 하위 컴포넌트의 프롭스(title,sub)로 가져왔음
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)} //이벤트 직접 만들어줌_onchange라는 프롭스는 저쪽에 만들고 온클릭은 subject.js에 적용해줬네?
        ></Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({ mode: "read", selected_content_id: Number(id) });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("Really???")) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
                alert("Deleted!!");
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;

// 12강) this.props.name : component의 속성 표현식(리액트의 attribute)
