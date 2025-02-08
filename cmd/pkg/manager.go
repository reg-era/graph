package jwt

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (u *User) HashData() string {
	data := u.Username + ":" + u.Password
	encoded := base64.StdEncoding.EncodeToString([]byte(data))
	return encoded
}

type Token struct {
	hash string
	Jwt  string `json:"jwt"`
}

type request struct {
	url    string
	method string
	header []struct {
		key   string
		value string
	}
	body           io.Reader
	response       string
	responseStatus int
}

func (req *request) sendeRequest() error {
	prepareReq, err := http.NewRequest(req.method, req.url, req.body)
	if err != nil {
		fmt.Fprintf(os.Stdout, "error on sending request: %v\n", err)
		return err
	}

	for i := 0; i < len(req.header); i++ {
		prepareReq.Header.Set(req.header[i].key, req.header[i].value)
	}

	client := http.Client{}
	res, err := client.Do(prepareReq)
	if err != nil {
		fmt.Fprintf(os.Stdout, "error on sending request: %v\n", err)
		return err
	}
	defer res.Body.Close()
	req.responseStatus = res.StatusCode

	if req.responseStatus != 200 {
		return fmt.Errorf("error on curl: %s", res.Status)
	}

	body, err := io.ReadAll(res.Body)
	if err != nil {
		fmt.Fprintf(os.Stdout, "error on sending request: %v\n", err)
		return err
	}
	req.response = string(body)
	return nil
}

func NewToken(code string) *Token {
	return &Token{
		hash: code,
	}
}

func (jwt *Token) GetToken() error {
	request := request{
		url:    "https://learn.zone01oujda.ma/api/auth/signin",
		method: "POST",
		header: make([]struct {
			key   string
			value string
		}, 1),
		body: nil,
	}

	request.header[0] = struct {
		key   string
		value string
	}{"Authorization", "Basic " + jwt.hash}

	if err := request.sendeRequest(); err != nil {
		fmt.Fprintf(os.Stdout, "error on sending request: %v\n", err)
		return err
	}

	jwt.Jwt = strings.Trim(request.response, `"`)
	return nil
}

func (jwt *Token) PingToken() error {
	request := request{
		url:    "https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql",
		method: "POST",
		header: make([]struct {
			key   string
			value string
		}, 2),
		body: nil,
	}

	request.header[0] = struct {
		key   string
		value string
	}{"Authorization", "Bearer " + jwt.Jwt}
	request.header[1] = struct {
		key   string
		value string
	}{"Content-Type", "application/json"}

	request.body = bytes.NewBuffer([]byte("{ record { authorId } }"))

	if err := request.sendeRequest(); err != nil {
		fmt.Fprintf(os.Stdout, "error on sending request: %v\n", err)
		return err
	}

	var errFormat struct {
		Err []struct {
			Message string `json:"message"`
		} `json:"errors"`
	}

	err := json.Unmarshal([]byte(request.response), &errFormat)
	if err != nil || len(errFormat.Err) > 0 {
		fmt.Fprintf(os.Stdout, "error on sending request: %v\n", err)
		return err
	}

	return nil
}
