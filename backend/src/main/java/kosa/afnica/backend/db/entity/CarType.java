package kosa.afnica.backend.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Base64;

@Getter
@NoArgsConstructor
public class CarType {

    private Long id;
    private String name;
    private byte[] logo;
    private Long brandId;

    // File과 Json을 따로 받고, 저장
    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    // 클라이언트로 넘겨줄때 Base64로 인코딩 해서 넘겨주면 String값 그대로 Src로 사용 가능
    public String getSrc() {
        return Base64.getEncoder().encodeToString(this.logo);
    }

}
