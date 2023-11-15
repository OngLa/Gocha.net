package kosa.afnica.backend.api.service;

import kosa.afnica.backend.db.dto.member.MemberSignupReqDto;

public interface MemberService {
    boolean existEmail(String email);

    boolean existName(String name);

    public void createMember(MemberSignupReqDto memberSignupReqDto);

    public void creatAdminMember(MemberSignupReqDto memberSignupReqDto);

    String findRole(String email);

}
