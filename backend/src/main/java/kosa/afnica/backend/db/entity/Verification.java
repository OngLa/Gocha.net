package kosa.afnica.backend.db.entity;

import kosa.afnica.backend.db.dto.member.EmailVerificationDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.security.SecureRandom;
import java.util.Random;

@Getter
@NoArgsConstructor
public class Verification {

    Long id;
    String veriEmail;
    String veriCode;

    @Builder
    public Verification(String veriEmail, String veriCode) {
        this.id = id;
        this.veriEmail = veriEmail;
        this.veriCode = veriCode;
    }

}