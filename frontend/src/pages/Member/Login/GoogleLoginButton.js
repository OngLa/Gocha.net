import React, { useEffect } from "react";

function GoogleLoginButton() {
  // 렌더링 시, google oauth에 대한 버튼 정보
  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: "",
      auto_prompt: false,
      ux_mode: "redirect",
      login_uri: "http://localhost:8080/api/auth/oauth-login",
      nonce: "",
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        type: "icon",
        theme: "outline",
        size: "large",
        locale: "ko",
        shape: "circle",
      }
    );
  }, []);

  return (
    <div>
      <div id="buttonDiv"></div>
    </div>
  );
}

export default GoogleLoginButton;