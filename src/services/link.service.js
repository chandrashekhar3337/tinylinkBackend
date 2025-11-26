import prisma from "../prisma/client.js";

export default {
  async createLink(code, targetUrl) {
    return prisma.link.create({ data: { code, targetUrl } });
  },

  async getAllLinks() {
    return prisma.link.findMany({ orderBy: { createdAt: "desc" } });
  },

  async getLink(code) {
    return prisma.link.findUnique({ where: { code } });
  },

  async deleteLink(code) {
    return prisma.link.delete({ where: { code } });
  },

  async incrementClick(code) {
    return prisma.link.update({
      where: { code },
      data: {
        clicks: { increment: 1 },
        lastClicked: new Date(),
      },
    });
  }
};
