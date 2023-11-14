package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.MemberService;
import kosa.afnica.backend.db.entity.CarBrand;
import kosa.afnica.backend.db.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {
    private final MemberMapper memberMapper;

    @Override
    public String findRole(String email) {
        return memberMapper.findRoleByEmail(email);
    }


}
