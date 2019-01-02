import React from "react";
import UploadAction from "../../../store/main/uploadAction.js";

export default class UploadImage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            style: {
                position: 'absolute',
                width: '100%',
                height: '100%',
                right: '0',
                top: '0',
                opacity: '0',
            }
        }
    }

    submitImage = (e) => {
        let self = this;
        let id = e.target.id
        UploadAction.osstoken(e.target.value,function (data) {
            var formData = new FormData();//构造空对象，下面用append 方法赋值。
            formData.append("key", data.fileName);
            formData.append("OSSAccessKeyId", data.accessid);
            formData.append("policy", data.policy);
            formData.append("Signature", data.signature);
            formData.append("file", $("#" + id)[0].files[0]);
            $.ajax({
                url : data.host,
                type : 'POST',
                data : formData,
                /**
                 * 必须false才会避开jQuery对 formdata 的默认处理
                 * XMLHttpRequest会对 formdata 进行正确的处理
                 */
                processData : false,
                /**
                 *必须false才会自动加上正确的Content-Type
                 */
                contentType : false,
                success: function(responseStr) {
                    self.props.handle(data.host + '/' + data.fileName,self.props.id);
                },
                error: function(responseStr) {
                    console.log("失败:" + JSON.stringify(responseStr));
                }
            });
        });
    }

    render() {
        return (
            <input type="file" id={this.props.id} accept="image/*" style={this.state.style} onChange={this.submitImage.bind(this)}/>
        )
    }
}