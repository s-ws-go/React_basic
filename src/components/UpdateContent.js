import { Component } from "react";

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc,
    };
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  inputFormHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    console.log(this.props.data);
    console.log("UpdateContent render");
    return (
      <article>
        <h2>Update</h2>
        <form
          action="/create_process"
          method="post"
          onSubmit={function (e) {
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
          }.bind(this)}
        >
          <input type="hidden" name="id" value={this.state.id}></input>
          {/* 선택한게 업데이트 메뉴의 기본값으로 보이게 해 주는 기능임.*/}
          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={this.inputFormHandler} // 이쪽에는 inputformhandler 매개변수 자리 안넣네?
            ></input>
          </p>
          <p>
            <textarea
              onChange={this.inputFormHandler}
              name="desc"
              placeholder="description"
              value={this.state.desc}
              // react에서 textarea의 값 넣을때는 value라는 attribute 써야 함
            ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;
