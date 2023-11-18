package kosa.afnica.backend.db.mapper;

import kosa.afnica.backend.db.entity.Member;
import kosa.afnica.backend.db.entity.Verification;
import org.apache.ibatis.annotations.Mapper;

import java.util.Optional;

@Mapper
public interface MemberMapper {

    // 회원 정보 저장
    void save(Member member);

//    void saveAdmin(Member member);

    // ID 기반으로 회원 정보 조회
    Optional<Member> findById(Long id);

    // 이메일 기반으로 회원 정보 조회
    Optional<Member> findByEmail(String email);

    String findRoleByEmail(String email);

    // 중복되는 이메일 조회
    int existByEmail(String email);

    // 중복되는 닉네임 조회
    int existByName(String name);

    // 회원 정보 수정
    void update(Member member);

    // 인증 번호 저장
    void saveCode(Verification verification);

    // 이메일 기반에 따른 인증번호 조회
    String findCodeByEmail(String email);

//    boolean existCodeByEmail(String veriCode);

    int countVerificationCodeByEmail(String email, String veriCode);
}
