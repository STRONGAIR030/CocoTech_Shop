import { useState } from "react";

const ImageUpload = () => {
    const [image, setImage] = useState(null);

    // 处理文件选择
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // 显示本地图片
        }
    };

    return (
        <div>
            <h3>上传图片</h3>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {image && (
                <div style={{ marginTop: "20px" }}>
                    <p>图片预览：</p>
                    <img
                        src={image}
                        alt="Preview"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
