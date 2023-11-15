package kosa.afnica.backend.api.service.impl;

import kosa.afnica.backend.api.service.MemberService;
import kosa.afnica.backend.db.dto.member.MemberSignupReqDto;
import kosa.afnica.backend.db.entity.Member;
import kosa.afnica.backend.db.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public boolean existEmail(String email) {
        int count = memberMapper.existByEmail(email);
        return count == 0;
    }

    @Override
    public boolean existName(String name) {
        int count = memberMapper.existByName(name);
        return count == 0; // 중복 안됨
    }

    @Override
    public void createMember(MemberSignupReqDto memberSignupReqDto) {

        Member member = Member.builder()
                .email(memberSignupReqDto.getEmail())
                .name(memberSignupReqDto.getName())
                .password(passwordEncoder.encode(memberSignupReqDto.getPassword()))
                .phoneNumber(memberSignupReqDto.getPhoneNumber())
                .address(memberSignupReqDto.getAddress())
                .role(memberSignupReqDto.getRole())
                .build();

        memberMapper.save(member);
    }

    @Override
    public void creatAdminMember(MemberSignupReqDto memberSignupReqDto) {

        Member member = Member.builder()
                .email(memberSignupReqDto.getEmail())
                .name(memberSignupReqDto.getName())
                .password(passwordEncoder.encode(memberSignupReqDto.getPassword()))
                .phoneNumber(memberSignupReqDto.getPhoneNumber())
                .address(memberSignupReqDto.getAddress())
                .role(memberSignupReqDto.getRole())
                .build();

        memberMapper.saveAdmin(member);

    }

    @Override
    public String findRole(String email) {
        return memberMapper.findRoleByEmail(email);
    }


}
