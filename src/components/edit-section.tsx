import { EditUserSchema } from "@/lib/schema";
import { useTokenStore } from "@/lib/store";
import { Button, Flex, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface EditSectionProps {
  section: string;
  value: string;
  withEdit?: boolean;
}

const EditSection = ({ section, value, withEdit }: EditSectionProps) => {
  const { token } = useTokenStore();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const validatedFields = EditUserSchema.safeParse(data);
    console.log("validation Fields:", validatedFields);
    if (!validatedFields.success) {
      const errorMessages: any = validatedFields.error.flatten().fieldErrors;
      for (const key in errorMessages) {
        setError(key, {
          type: "manual",
          message: errorMessages[key]?.[0],
        });
      }
      return;
    }

    setLoading(true);
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/update`,
        validatedFields.data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      location.reload();
    } catch (error: any) {
      setError("apiError", {
        type: "manual",
        message: error.response?.data?.message || "Something went wrong",
      });
    }
    setLoading(false);
    close();
  };

  return (
    <Flex
      justify="space-between"
      align="center"
    >
      <div className="w-[70%]">
        <h1 className="font-bold capitalize">{section}</h1>
        <p>{value}</p>
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title={`Edit ${section}`}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            <label
              htmlFor={section}
              className="block text-sm font-medium text-gray-900 mb-1 capitalize"
            >
              {section}
            </label>
            <input
              type="text"
              {...register(section)}
              id={section}
              placeholder={section}
              className="border rounded-md bg-gray-50 border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
            />
            {errors[section]?.message && (
              <p className="mt-2 text-sm text-red-500">
                {errors[section]?.message as string}
              </p>
            )}
            {errors.apiError?.message && (
              <p className="mt-2 text-sm text-red-500">
                {errors.apiError.message as string}
              </p>
            )}
          </div>
          <Button
            type="submit"
            loading={loading}
          >
            Save
          </Button>
        </form>
      </Modal>
      {withEdit && (
        <Button
          size="sm"
          w={75}
          className="w-[30%]"
          onClick={open}
        >
          Edit
        </Button>
      )}
    </Flex>
  );
};

export default EditSection;
