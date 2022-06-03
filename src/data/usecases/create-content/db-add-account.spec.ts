import { DbAddAccount } from "./db-add-account";
import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from "./db-add-account-protocols";

const makeEncrypter = (): Encrypter => {
  class EncrypterSTUB implements Encrypter {
    async encrypt(password: string): Promise<string> {
      return new Promise((resolve) => resolve("hashed_password"));
    }
  }
  return new EncrypterSTUB();
};

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositorySTUB implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
        password: "hashed_password",
      };
      return new Promise((resolve) => resolve(fakeAccount));
    }
  }
  return new AddAccountRepositorySTUB();
};

interface SUTTypes {
  sut: DbAddAccount;
  encrypterSTUB: Encrypter;
  addAccountRepositorySTUB: AddAccountRepository;
}

const makeSUT = (): SUTTypes => {
  const encrypterSTUB = makeEncrypter();
  const addAccountRepositorySTUB = makeAddAccountRepository();
  const sut = new DbAddAccount(encrypterSTUB, addAccountRepositorySTUB);
  return {
    sut,
    encrypterSTUB,
    addAccountRepositorySTUB,
  };
};
describe("DbAddAccount Usecase", () => {
  test("Should call Encrypter with correct password", async () => {
    const { sut, encrypterSTUB } = makeSUT();
    const encryptSpy = jest.spyOn(encrypterSTUB, "encrypt");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith("valid_password");
  });

  test("Should throw if Encrypter with throws", async () => {
    const { sut, encrypterSTUB } = makeSUT();
    jest
      .spyOn(encrypterSTUB, "encrypt")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  test("Should call AddAccountRepository with correct values", async () => {
    const { sut, addAccountRepositorySTUB } = makeSUT();
    const addSpy = jest.spyOn(addAccountRepositorySTUB, "add");
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    await sut.add(accountData);
    expect(addSpy).toHaveBeenCalledWith({
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });

  test("Should throw if AddAccountRepository with throws", async () => {
    const { sut, addAccountRepositorySTUB } = makeSUT();
    jest
      .spyOn(addAccountRepositorySTUB, "add")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const promise = sut.add(accountData);
    await expect(promise).rejects.toThrow();
  });

  test("Should return an account on success", async () => {
    const { sut } = makeSUT();
    const accountData = {
      name: "valid_name",
      email: "valid_email",
      password: "valid_password",
    };
    const account = await sut.add(accountData);
    expect(account).toEqual({
      id: "valid_id",
      name: "valid_name",
      email: "valid_email",
      password: "hashed_password",
    });
  });
});
