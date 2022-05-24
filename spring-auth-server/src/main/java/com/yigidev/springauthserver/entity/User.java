package com.yigidev.springauthserver.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.yigidev.springauthserver.model.AuthProvider;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "systemuser", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@Getter @Setter
public class User extends BaseEntity{
	
	@Column(nullable = false)
	private String fullName;
	
	@Email
	@Column(nullable = false)
	private String email;
	
	@JsonIgnore
    private String password;
	
	@NotNull
    @Enumerated(EnumType.STRING)
    private AuthProvider provider;
	
	private String providerId;
	
	private String imageUrl;

}
