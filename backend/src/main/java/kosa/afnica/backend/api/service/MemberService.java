package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.entity.CarBrand;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    String findRole(String email);
}
